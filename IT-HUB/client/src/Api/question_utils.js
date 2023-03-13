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
  return client.fetchQuery(["question", id], queryFn, {
    staleTime: 1000 * 60,
  });
};

export const getMyQuestion = async ({ params }) => {
  const { id } = params;
  const queryFn = async () => {
    const { data } = await axios.get(`/api/question/mydiscussion/page/${id}`);
    console.log(data);
    return data;
  };
  return client.fetchQuery(["myquestion", id], queryFn);
};

export const getTaggedQuestion = async ({ params }) => {
  const { id, tname } = params;
  const queryFn = async () => {
    const { data } = await axios.get(`/api/question/tag/${tname}/page/${id}`);
    return data;
  };
  return client.fetchQuery(["tag", tname, id], queryFn);
};

// detele a question
export const deleteQuestion = async ({ params }) => {
  const { id } = params;

  try {
    await axios.delete(`/api/question/${id}`);

    // invalidate the cache
    client.invalidateQueries(["question"]);

    return redirect("/question/page/1");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot delete", { status: 404 });
  }
};

// report a question
export const reportQuestion = async ({ params }) => {
  const { id } = params;

  try {
    console.log("reporting");
    await axios.post(`/api/report/${id}`);
    client.invalidateQueries(["reportedPost"]);
    return redirect(`/question/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("Cannot report", { status: 404 });
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
  let post = {
    question: formData.get("question"),
    image: formData.get("image"),
    title: formData.get("title"),
    tag: formData.get("tag"),
  };

  // change the tags into array

  post.tag = post.tag.split(",");
  post.tag = post.tag.map((t) => t.trim());

  // limit the number of tags to 5

  if (post.tag.length > 5) {
    post.tag = post.tag.slice(0, 5);
  }

  console.log(post);

  post.question = post.question.replace(
    /background-color:[^;]*;/g,
    "background-color:transparent;"
  );

  post.question = post.question.replace(/<p>\s*<\/p>/g, "");

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
    console.log(error);
    client.setQueryData(queryKey, OldQuestions);
    return error.response;
  }
};

// get a particular answer
