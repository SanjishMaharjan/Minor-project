import axios from "axios";
import { redirect } from "react-router-dom";
import { postQuestionSchema } from "../validation/post_question_schema";
import { validator } from "../validation/validator";
import { postAnswerSchema } from "../validation/post_answer_schema";
const queryKey = ["chat"];

import { client } from "./queryClient";

export const getQuestion = async () => {
  const queryFn = async () => {
    const { data } = await axios.get("/api/question");
    return data.reverse();
  };
  return client.fetchQuery(queryKey, queryFn, { staleTime: 1000 * 60 * 1 });
};

export const deleteQuestion = async ({ params }) => {
  // get the question from cache

  const OldQuestions = client.getQueryData(queryKey);

  // remove the question from the cache
  const newQuestions = OldQuestions.filter((q) => q._id !== params.id);

  // set the new cache

  client.setQueryData(queryKey, newQuestions);

  try {
    await axios.delete(`/api/question/${params.id}`);

    client.invalidateQueries(queryKey);

    return redirect("/question");
  } catch (error) {
    throw new Error("Cannot delete", { status: 404 });
  }
};

export const upvoteQuestion = async ({ params }) => {
  // get the question from cache

  const OldQuestions = client.getQueryData(queryKey);

  const Oldquestion = client.getQueryData(queryKey).find((q) => q._id === params.id);

  // check if the user has already upvoted the question
  // first get userId from query cache

  const userId = client.getQueryData(["user"])._id;
  // const userId = QC.getQueryData(["user"])._id;

  if (Oldquestion.upvote.upvoters.includes(userId)) {
    Oldquestion.upvote.count -= 1;

    // remove the user from the upvoters array
    Oldquestion.upvote.upvoters = Oldquestion.upvote.upvoters.filter((u) => u !== userId);
  } else {
    Oldquestion.upvote.count += 1;

    // add the user to the upvoters array
    Oldquestion.upvote.upvoters.push(userId);
  }

  const newQuestions = OldQuestions.map((q) => {
    if (q._id === params.id) {
      return Oldquestion;
    }
    return q;
  });

  // update the cache
  client.setQueryData(queryKey, newQuestions);

  try {
    await axios.post(`/api/question/${params.id}/upvote`);

    client.invalidateQueries(queryKey);
    return redirect("/question");
  } catch (error) {
    client.setQueryData(queryKey, OldQuestions);
  }
};

export const postQuestion = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    question: formData.get("question"),
    image: formData.get("image"),
  };
  console.log(post);

  const res = await validator(post, postQuestionSchema);
  if (res.status == 403) return res;

  try {
    const response = await axios.post("/api/question", post,
    {
          headers: {
                "Content-Type": "multipart/form-data",
              }
  });

    client.invalidateQueries(queryKey);

    return response;
  } catch (error) {
    client.setQueryData(queryKey, OldQuestions);
    return error.response;
  }
};

export const getAnswer = async ({ params }) => {
  const { id } = params;

  const response = await axios.get(`/api/${id}/comment`);
  if (response.status != 200) {
    throw new Error("Not Found", { status: 404 });
  }

  const particularQuestion = await axios.get(`/api/question/${id}`);

  return { answer: response.data, question: particularQuestion.data };
};

export const commentQuestion = async ({ params, request }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = {
    answer: formData.get("answer"),
  };

  const res = await validator(data, postAnswerSchema);
  if (res.status === 403) return res;

  const response = await axios.post(`/api/${id}/comment`, data);
  // if (response.status != 201) throw new Error("Not Found", { status: 404 });
  return response;
};
