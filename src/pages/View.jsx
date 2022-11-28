import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Protected from "../components/Protected";

import { useQuery } from "react-query";
import { getSingleNote } from "../utils";
function View() {
  const [post, setPost] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  const { id } = useParams();
  const getSingleNote2 = async () => {
    try {
      const res = await fetch("http://localhost:5000/singlenote", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
          id,
        },
      });
      const response = await res.json();

      if (response.status) {
        console.log(response);
        setPost({
          title: response.data.title,
          description: response.data.description,
          tag: response.data.tag,
        });
      } else {
        console.log("error");
        setError({ isError: true, msg: response.data });
      }
    } catch (e) {
      setError({ isError: true, msg: "Unknown error occured!!" });
    }
    setTimeout(() => {
      setError({ isError: false, msg: "" });
    }, 3000);
  };

  useEffect(() => {
    const d = getSingleNote(id);
    d.then((r) => {
      const { title, description, tag } = r.data;
      setPost({ title, description, tag });
    }).catch((c) => {
      setError({ msg: c.message, isError: true });
    });
  }, [id]);

  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["note", id],
  //   queryFn: () => {
  //     getSingleNote(id);
  //   },
  // });
  // console.log(data);

  return (
    <Protected>
      <div className="container">
        <div className="error-container">
          {error.isError && <span className="error-messege">{error.msg}</span>}
        </div>

        <div className="view-container">
          <div>
            <h1 className="view-title" style={{ display: "inline-block" }}>
              {post.title}
            </h1>
            <Link to={`/edit/${id}`}>
              <span
                style={{ margin: "0 10px", color: "white", opacity: "0.87" }}
              >
                Edit Note
              </span>
            </Link>
          </div>
          <div>
            <span className="view-tag">{post.tag}</span>
          </div>
          <p
            className="view-description"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></p>
        </div>
      </div>
    </Protected>
  );
}

export default View;
