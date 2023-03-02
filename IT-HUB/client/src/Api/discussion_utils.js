import axios from "axios";
import { redirect } from "react-router-dom";
import { postQuestionSchema } from "../validation/post_question_schema";
import { validator } from "../validation/validator";
import { postAnswerSchema } from "../validation/post_answer_schema";

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

export const upvoteQuestion = async ({ params }) => {
  const res = await axios.post(`/api/question/${params.id}/upvote`);
  console.log(res.status);
  if (!res.status === 200) throw new Error("Error occured while upvoting");
  return redirect("/question");
};

export const postQuestion = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    question: formData.get("question"),
    image: formData.get('image')
  };
  console.log(post);

  const res = await validator(post, postQuestionSchema);
  if (res.status == 403) return res;

    const response = await axios.post("/api/question", post,
  {
        headers: {
              "Content-Type": "multipart/form-data",
            }
});

  if (!response.status === 200) throw Error("cannot post data");
  return response;
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
  if (response.status != 201) throw new Error("Not Found", { status: 404 });
  return response;
};
