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

export const getAnswer = async ({ params }) => {
  const { id } = params;

  const queryFn = async () => {
    const response = await axios.get(`/api/${id}/comment`);
    // if (response.status != 200) {
    //   throw new Error("Not Found", { status: 404 });
    // }
    return response.data;
  };

  return client.fetchQuery(["answer", id], queryFn, {
    staleTime: 1000 * 60 * 60,
  });
};

// post an answer
export const commentQuestion = async ({ params, request }) => {
  const { id } = params;
  const formData = await request.formData();
  let data = {
    answer: formData.get("answer"),
  };

  console.log(data);

  // get the question from cache

  const OldAnswers = client.getQueryData(["answer", id]);

  const { comments, questionInfo, unAnswered, topContributor } = OldAnswers;

  // validate the data
  const res = await validator(data, postAnswerSchema);
  if (res.status == 403) return res;

  // add the answer to the cache
  const newAnswers = [...comments, data];

  // update the cache
  data.answer = data.answer.replace(/background-color:[^;]*;/g, "background-color:transparent;");

  client.setQueryData(["answer", id], {
    questionInfo,
    comments: newAnswers,
    unAnswered,
    topContributor,
  });

  // reset the form

  try {
    const response = await axios.post(`/api/${id}/comment`, data);
    client.invalidateQueries(["answer", id]);
    return response;
  } catch (error) {
    console.log(error);
    client.setQueryData(["answer", id], OldAnswers);
    return error.response;
  }
};

// upvote an answer
export const upvoteAnswer = async ({ params }) => {
  const { id, answerId } = params;

  // get the answer from cache

  const OldAnswers = client.getQueryData(["answer", id]);

  const OldAnswer = OldAnswers.comments.find((a) => a?._id === answerId);
  const OldQuestion = OldAnswers.question;

  const oldUnanswered = OldAnswers.unAnswered;
  const topContributor = OldAnswers.topContributor;

  // check if the user has already upvoted the answer
  // first get userId from query cache
  const userId = client.getQueryData(["user"])?._id;

  if (OldAnswer.upvote.upvoters.includes(userId)) {
    OldAnswer.upvote.count -= 1;
    OldAnswer.upvote.upvoters = OldAnswer.upvote.upvoters.filter((u) => u !== userId);
    // update the array
  } else {
    OldAnswer.upvote.count += 1;
    // remove the user from the upvoters array
    OldAnswer.upvote.upvoters.push(userId);
  }

  const newAnswers = OldAnswers.comments.map((a) => {
    if (a?._id === answerId) {
      return OldAnswer;
    }
    return a;
  });

  // update the cache
  client.setQueryData(["answer", id], {
    question: OldQuestion,
    comments: newAnswers,
    unAnswered: oldUnanswered,
    topContributor,
  });

  try {
    await axios.patch(`/api/${id}/comment/${answerId}/upvote`);

    client.invalidateQueries(["answer", id]);
    return redirect(`/question/${id}`);
  } catch (error) {
    client.setQueryData(["answer", id], OldAnswers);
  }
};
