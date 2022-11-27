import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import {
  deleteComment,
  /* getProductComment, */ traerReview,
 /*  postComment, */ Review,
} from "../../redux/actions";





export const Comentarios = (id) => {
  const dispatch = useDispatch();
 // const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  //console.log(userLogged);
  const allCommentsByProduct = useSelector((state) => state.comentarios);
  const userId = Object.values(useSelector((state) => state.login)) 
  
  const [comment, setComment] = useState("");
  const [ondelete, onsetDelete] = useState("");




  const handleOnChange = (e) => {
    setComment(e.target.value);
    console.log(comment)
  };

  const handlePost = () => {
    dispatch(
        Review( {id:id , comentarios:comment} )

    ).then(() => {
      setComment("");
      dispatch(traerReview(id.id))
        .then(() => {
          document.getElementById("commentSent").style.display = "block";
        })
        .then(() => {
          handleModal();
        });
    });
  };

  //console.log({ userId: userLogged.id, productId: id.id, text: comment });

  //not deleting
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteComment(id)).then(() => {
      dispatch(traerReview(id.id))
        .then(() => {
          document.getElementById("commentDeleted").style.display = "block";
        })
        .then(() => {
          handleModalDeleted();
        });
    });
  };

  const handleModalDeleted = () => {
    setTimeout(() => {
      document.getElementById("commentDeleted").style.display = "none";
      dispatch(traerReview(id.id));
    }, 900);
  };

  //win
  const handleModal = () => {
    setTimeout(() => {
      document.getElementById("commentSent").style.display = "none";
      dispatch(traerReview(id.id));
    }, 1000);
  };
  /* 
  useEffect(() => {
    dispatch(getProductComment(id.id));
  }, [dispatch]); */

  //comments only show after second click

  return (
    <div>
      {allCommentsByProduct &&
        allCommentsByProduct.map((e) => {
          return (
            <div key={e.id}>
              <p>{e.texto}</p>
              {/* apparently it crashes here after */}
              {/* userLogged?.id === e.UserId &&  */(
                <div>
                  <button onClick={() => handleDelete(e.id)}>X</button>
                  <div id="commentDeleted" className="commentSent">
                    <span>Comentario Borrado</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {/* userLogged &&  */(
        <div>
          <span>Post Your Comments</span>
          <textarea onChange={handleOnChange} />
          <button onClick={handlePost}>add your review!</button>
          <div id="commentSent" className="commentSent">
            <div>
              <span>Comentario enviado existosameente!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comentarios; 
