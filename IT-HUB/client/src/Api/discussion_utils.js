import axios from "axios";
import { redirect } from "react-router-dom";

export const getQuestion = async () => {
  const question = await axios.get("/api/question");
  question.data.reverse();
  return question.data;
};

export const deleteQuestion = async ({ params }) => {
  const res = await axios.delete(`/api/question/${params.id}`);
  console.log(res.status);
  if (!res.status === 200) throw new Error("Error occured while deleting");
  return redirect("/question");
};

export const postQuestion = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    question: formData.get("question"),
  };

  const res = await axios.post("/api/question", post);

  if (!res.status === 200) throw Error("cannot post data");

  return redirect("/question");
};

export const getAnswer = async ({ params }) => {
  const { id } = params;
  const response = await axios.get(`/api/${id}/comment`);
  console.log(response);
  console.log(response.status);
  if (response.status != 200) {
    throw new Error("Not Found", { status: 404 });
  }

  const particularQuestion = await axios.get(`/api/question/${id}`);

  return { answer: response.data, question: particularQuestion.data };
};

export const commentQuestion = async ({ params, request }) => {
  const { questionId } = params;
  const formData = await request.formData();
  const data = {
    answer: formData.get("answer"),
  };
  console.log(questionId);
  console.log(data);
  const response = await axios.post(`/api/${questionId}/comment`, data);
  if (response.status != 201) throw new Error("Not Found", { status: 404 });

  return redirect(`/question/${questionId}`);
};
