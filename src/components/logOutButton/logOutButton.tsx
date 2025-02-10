import { ReactNode } from "react";
import styled from "styled-components";
export const LogOutButton = ({
  name,
  icon,
}: {
  name: string | null;
  icon: ReactNode;
}) => {
  return (
    <StyledWrapper>
      <button className="Btn ms-3 hover:ms-0">
        <div className="sign">{icon}</div>
        <div className="text">{name}</div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: white;
  }

  /* plus sign */
  .sign {
    color: #fe5222;
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: #fe5222;
    font-size: 1.5em;
    font-weight: 600;
    transition-duration: 0.3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 155px;
    border-radius: 40px;
    transition-duration: 0.3s;
  }

  .Btn:hover .sign {
    width: 35%;
    transition-duration: 0.3s;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px, 2px);
  }
`;
