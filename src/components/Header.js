import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [disable, setAble] = useState("disable");

  const handleButtonClick = () => {
    if (disable) {
      setAble("");
    } else {
      setAble("disable");
    }
  };

  return (
    <header>
      <Link to="/">
        <div className="shop--title">
          <img className="logo" src="img/logo.png" alt="logo" />
          <span className="shop--title__text">COZ Shopping</span>
        </div>
      </Link>
      <i className="fa-solid fa-bars fa-2x" onClick={handleButtonClick}></i>
      <div id="triangle" className={disable}></div>
      <nav className={disable}>
        <div className="nav--item nav--item__profile">OOO님, 안녕하세요!</div>
        <Link to="/products/list">
          <div className="nav--item nav--item__productlist">
            <i className="fa-solid fa-gift"></i> 상품리스트 페이지
          </div>
        </Link>
        <Link to="/bookmark">
          <div className="nav--item nav--item__bookmark">
            <i className="fa-regular fa-star bookmark--page--star"></i> 북마크
            페이지
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
