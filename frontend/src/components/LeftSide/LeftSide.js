import "./LeftSide.css";

const LeftSide = (props) => {
  return (
    <div className="LeftSide">
      <button className="wrapperButton">
        <button
          onClick={() => {
            props.logout();
          }}
          className="LeftsideButton"
        >
          Log out
        </button>
        <button
          onClick={() => {
            props.renderAccountPage();
          }}
          className="LeftsideButton"
        >
          {props.switchButton}
        </button>
      </button>
      <div className="PushUp"></div>
      <button className="Image"></button>
    </div>
  );
};

export default LeftSide;
