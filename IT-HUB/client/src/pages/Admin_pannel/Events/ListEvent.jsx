import React from "react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { RiGalleryLine } from "react-icons/ri";
import { MdOutlineSubtitles, MdDescription } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { Form, useNavigation, useActionData, Navigate, Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import "./Editcontent.scss";
const ListEvent = () => {
  const { data: events } = useQuery(["events"], {
    enabled: false,
  });
  const { expiredEvents, upCommingEvents } = events;

  if (useNavigation().state === "submitting") return <Loader />;
  const res = useActionData();

  if (res && res.status === 200) return <Navigate to="/events" />;

  const serverError = res?.status === 400 && res?.data?.msg;
  const titleError = res?.status === 403 && res?.data?.errors?.title;
  const descriptionError = res?.status === 403 && res?.data?.errors?.description;
  const fileError = res?.status === 403 && res?.data?.errors?.images;

  return (
    <div className="main-container">
      <div className="box-admin">
        <h1>
          <RiGalleryLine /> Edit Expired Events
        </h1>
        {expiredEvents.map((event) => (
          <div className="upcomming-event" key={event?._id}>
            <hr />
            <Link to={`/admin/editEvent/${event._id}`}>
              <h2 style={{ marginTop: "1rem" }}>{event.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEvent;
