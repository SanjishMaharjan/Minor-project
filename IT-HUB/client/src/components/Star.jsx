import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Star = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  const starElements = [];

  for (let i = 0; i < filledStars; i++) {
    starElements.push(<AiFillStar key={i} />);
  }

  if (hasHalfStar) {
    starElements.push(<AiFillStar key={filledStars} style={{ opacity: 0.5 }} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    starElements.push(<AiOutlineStar key={filledStars + i + (hasHalfStar ? 1 : 0)} />);
  }

  return <>{starElements}</>;
};

export default Star;
