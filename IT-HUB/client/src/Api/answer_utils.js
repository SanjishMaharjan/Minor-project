import axios from "axios";
import { redirect } from "react-router-dom";
import { validator } from "../validation/validator";
import { postAnswerSchema } from "../validation/post_answer_schema";

import { client } from "./queryClient";

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
    return error;
  }
};

// upvote an answer
export const upvoteAnswer = async ({ params }) => {
  const { id, answerId } = params;

  // get the answer from cache

  const OldAnswers = client.getQueryData(["answer", id]);

  const OldAnswer = OldAnswers.comments.find((a) => a?._id === answerId);

  const OldQuestion = OldAnswers.questionInfo;
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
    questionInfo: OldQuestion,
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

export const deleteAnswer = async ({ params }) => {
  const { id, answerId } = params;

  // get the answer from cache

  const OldAnswers = client.getQueryData(["answer", id]);
  console.log(OldAnswers);

  const OldQuestion = OldAnswers.questionInfo;
  const oldUnanswered = OldAnswers.unAnswered;
  const topContributor = OldAnswers.topContributor;

  // remove the answer from the array
  const newAnswers = OldAnswers.comments.filter((a) => a?._id !== answerId);

  // update the cache
  client.setQueryData(["answer", id], {
    questionInfo: OldQuestion,
    comments: newAnswers,
    unAnswered: oldUnanswered,
    topContributor,
  });

  try {
    await axios.delete(`/api/${id}/comment/${answerId}`);

    client.invalidateQueries(["answer", id]);
    return redirect(`/question/${id}`);
  } catch (error) {
    console.log(error);
    client.invalidateQueries(["answer", id]);
  }
};

export const updateAnswer = async ({ params, request }) => {
  const { id, answerId } = params;

  const formData = await request.formData();
  let data = {
    answer: formData.get("answer"),
  };

  // get the answer from cache

  const OldAnswers = client.getQueryData(["answer", id]);

  const OldQuestion = OldAnswers.questionInfo;
  const oldUnanswered = OldAnswers.unAnswered;
  const topContributor = OldAnswers.topContributor;

  // validate the data
  const res = await validator(data, postAnswerSchema);
  if (res.status == 403) return res;

  data.answer = data.answer.replace(/background-color:[^;]*;/g, "background-color:transparent;");
  // update the answer in the cache
  const newAnswers = OldAnswers.comments.map((a) => {
    if (a?._id === answerId) {
      return { ...a, answer: data.answer };
    }
    return a;
  });

  // update the cache
  client.setQueryData(["answer", id], {
    questionInfo: OldQuestion,
    comments: newAnswers,
    unAnswered: oldUnanswered,
    topContributor,
  });

  try {
    const response = await axios.patch(`/api/${id}/comment/${answerId}`, data);

    client.invalidateQueries(["answer", id]);
    return response;
  } catch (error) {
    client.setQueryData(["answer", id], OldAnswers);
  }
};
