export const validator = async (data, schema) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { status: 200 };
  } catch (error) {
    const errors = {};
    for (let err of error.inner) {
      errors[err.path] = err.message;
    }
    return {
      status: 403,
      data: { errors },
    };
  }
};
