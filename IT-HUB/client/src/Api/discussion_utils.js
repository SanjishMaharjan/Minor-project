import axios from "axios";
import { redirect } from "react-router-dom";
import { postQuestionSchema } from "../validation/post_question_schema";
import { validator } from "../validation/validator";
import { postAnswerSchema } from "../validation/post_answer_schema";
const queryKey = ["question"];

import { client } from "./queryClient";

// get all the questions
export const getQuestion = async ({ params }) => {
  const { id } = params;
  console.log(id);
  const queryFn = async () => {
    const { data } = await axios.get(`/api/question/page/${id}`);
    return data;
  };
  return client.fetchQuery(["question", id], queryFn);
};

// detele a question
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

// upvote a question
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
    const response = await axios.post("/api/question", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    client.invalidateQueries(["question", "1"]);

    return response;
  } catch (error) {
    client.setQueryData(queryKey, OldQuestions);
    return error.response;
  }
};

// get a particular answer

export const getAnswer = async ({ params }) => {
  const { id } = params;

  const queryFn = async () => {
    const response = await axios.get(`/api/${id}/comment`);
    // if (response.status != 200) {
    //   throw new Error("Not Found", { status: 404 });
    // }
    return response.data;
  };

  return client.fetchQuery(["answer", id], queryFn);
};

// post an answer
export const commentQuestion = async ({ params, request }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = {
    answer: formData.get("answer"),
  };

  const res = await validator(data, postAnswerSchema);
  if (res.status === 403) return res;

  const response = await axios.post(`/api/${id}/comment`, data);

  client.invalidateQueries(["answer", id]);
  // if (response.status != 201) throw new Error("Not Found", { status: 404 });
  return response;
};
