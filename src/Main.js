import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

let bookmarkList = [];

function Main() {
  const [productList, setProductList] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [modalName, setModalName] = useState(null);
  const [modalDisable, setModalAble] = useState("modal disable");
  const [bookmarkListItem, setBookmarkListItem] = useState(
    JSON.parse(localStorage.getItem("bookmarkList"))
  );

  function saveBookmark() {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    setBookmarkListItem(JSON.parse(localStorage.getItem("bookmarkList")));
    console.log(bookmarkListItem);
  }

  useEffect(() => {
    fetch("http://cozshopping.codestates-seb.link/api/v1/products?count=4")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);
  return (
    <div>
      <Header />
      <main>
        <span className="product--list__title">상품 리스트</span>
        <div className="product--list">
          {productList &&
            productList.map((product) => (
              <div key={product.id}>
                <div className="img--wait">
                  <img
                    onClick={(el) => {
                      setModalAble("modal");
                      setModalImg(el.target.src);
                      setModalName(el.target.alt);
                    }}
                    src={
                      product.image_url
                        ? product.image_url
                        : product.brand_image_url
                    }
                    alt={
                      product.image_url
                        ? product.type === "Category"
                          ? "# " + product.title
                          : product.title
                        : product.brand_name
                    }
                  />
                  <i
                    className="fa-solid fa-star fa-lg star"
                    onClick={(el) => {
                      bookmarkList.push({
                        src: el.target.parentElement.children[0].src,
                        alt: el.target.parentElement.children[0].alt,
                        discountPercentage:
                          el.target.parentElement.parentElement.parentElement
                            .children[1].children[1].children[0].innerText,
                        price:
                          el.target.parentElement.parentElement.parentElement
                            .children[1].children[1].children[1].innerText,
                        sub_title:
                          el.target.parentElement.parentElement.parentElement
                            .children[1].children[0].children[1].innerText,
                      });
                      saveBookmark();
                    }}
                  ></i>
                </div>
                <div className="product--text--main">
                  <div className="product--title--subtitle">
                    <span className="product--title">
                      {product.title
                        ? product.type === "Category"
                          ? "# " + product.title
                          : product.title
                        : product.brand_name}
                    </span>
                    <span className="product--subtitle">
                      {product.sub_title}
                    </span>
                  </div>
                  <div className="product--text">
                    <span
                      className={
                        product.discountPercentage
                          ? "product--discount"
                          : product.type === "Brand"
                          ? "product--brand"
                          : ""
                      }
                    >
                      {product.discountPercentage
                        ? product.discountPercentage + "%"
                        : product.type === "Brand"
                        ? "관심 고객수"
                        : ""}
                    </span>
                    <span className="product--price">
                      {product.price
                        ? Number(product.price).toLocaleString("ko-KR") + "원"
                        : product.type === "Brand"
                        ? product.follower.toLocaleString("ko-KR")
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={modalDisable}>
          <img className="modal--item" src={modalImg} alt={modalName}></img>
          <i
            onClick={() => setModalAble("modal disable")}
            className="fa-solid fa-x fa-2x"
          ></i>
          <i className="fa-solid fa-star fa-2x"></i>
          <span className="modal--title">{modalName}</span>
        </div>
        <span className="bookmark--list__title">북마크 리스트</span>
        <div className="no--bookmark disable">
          <span className="no--bookmark__text">북마크 된 상품이 없습니다!</span>
          <i className="fa-solid fa-cart-shopping fa-5x"></i>
        </div>
        <div className="product--list">
          {bookmarkListItem
            ? bookmarkListItem.slice(0, 4).map((el, i) => {
                return (
                  <div key={i}>
                    <div className="img--wait">
                      <img
                        onClick={(el) => {
                          setModalAble("modal");
                          setModalImg(el.target.src);
                          setModalName(el.target.alt);
                        }}
                        src={el.src}
                        alt={el.alt}
                      />
                      <i
                        className="fa-solid fa-star fa-lg star"
                        onClick={(el) => {
                          bookmarkList.push({
                            src: el.target.parentElement.children[0].src,
                            alt: el.target.parentElement.children[0].alt,
                          });
                          saveBookmark();
                        }}
                      ></i>
                    </div>
                    <div className="product--text--main">
                      <div className="product--title--subtitle">
                        <span className="product--title">{el.alt}</span>
                        <span className="product--subtitle">
                          {el.sub_title}
                        </span>
                      </div>
                      <div className="product--text">
                        <span className={"product--discount"}>
                          {el.discountPercentage}
                        </span>
                        <span className="product--price">{el.price}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
