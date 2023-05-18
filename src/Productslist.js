import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function Productlist() {
  const [productList, setProductList] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [modalName, setModalName] = useState(null);
  const [modalDisable, setModalAble] = useState("modal disable");

  function getApi() {
    return fetch("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }

  function getApiFilter(el) {
    return fetch("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => response.json())
      .then((data) =>
        setProductList(
          data.filter((item) => {
            return item.type === el;
          })
        )
      );
  }

  useEffect(() => {
    fetch("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="product--filter">
        <div className="filter" onClick={() => getApi()}>
          <img src="img/all.jpg" alt="all" className="filter--img"></img>
          <span>전체</span>
        </div>
        <div className="filter" onClick={() => getApiFilter("Product")}>
          <img
            src="img/product.jpg"
            alt="product"
            className="filter--img"
          ></img>
          <span>상품</span>
        </div>
        <div className="filter" onClick={() => getApiFilter("Category")}>
          <img
            src="img/category.jpg"
            alt="category"
            className="filter--img"
          ></img>
          <span>카테고리</span>
        </div>
        <div className="filter" onClick={() => getApiFilter("Exhibition")}>
          <img
            src="img/exhibition.jpg"
            alt="exhibition"
            className="filter--img"
          ></img>
          <span>기획전</span>
        </div>
        <div className="filter" onClick={() => getApiFilter("Brand")}>
          <img src="img/brand.jpg" alt="brand" className="filter--img"></img>
          <span>브랜드</span>
        </div>
      </div>
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
                <i className="fa-solid fa-star fa-lg star"></i>
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
                  <span className="product--subtitle">{product.sub_title}</span>
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
      <Footer />
    </div>
  );
}

export default Productlist;
