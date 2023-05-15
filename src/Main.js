import { useEffect, useState } from "react";

function Main() {
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    fetch("http://cozshopping.codestates-seb.link/api/v1/products?count=4")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);
  return (
    <main>
      <span className="product--list__title">상품 리스트</span>
      <div className="product--list">
        {productList &&
          productList.map((product) => (
            <div key={product.id}>
              <div className="img--wait">
                <img
                  src={
                    product.image_url
                      ? product.image_url
                      : product.brand_image_url
                  }
                  alt={product.image_url ? product.title : product.brand_name}
                />
                <i className="fa-solid fa-star fa-lg"></i>
              </div>
              <div className="product--text--main">
                <div className="product--title--subtitle">
                  <span className="product--title">
                    {product.type === "Category" ? "# " : ""}
                    {product.title ? product.title : product.brand_name}
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
      <span className="bookmark--list__title">북마크 리스트</span>
    </main>
  );
}

export default Main;
