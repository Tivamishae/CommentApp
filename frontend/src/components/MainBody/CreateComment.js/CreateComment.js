import "./CreateComment.css";
import moment from "moment";

const CreateComment = (props) => {
  const handleChange = (event) => {
    const value = event.target.value;
    const type = ["type", "insertComment"];
    const date = ["date", moment().format("MMMM Do YYYY, h:mm:ss a")];
    const id = ["id", props.userID];
    props.setNewComment({
      value: value,
      [type[0]]: type[1],
      [date[0]]: date[1],
      [id[0]]: id[1],
    });
  };

  return (
    <div className="CreateComment">
      <button className="wrapper">
        <form onSubmit={props.handleSubmitNewComment}>
          <button className="postButton">Post</button>
          <textarea
            placeholder="Add comment"
            className="commentTextarea"
            type="text"
            name="comment"
            onChange={handleChange}
          />
        </form>
      </button>
    </div>
  );
};

export default CreateComment;
