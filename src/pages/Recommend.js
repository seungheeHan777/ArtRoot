// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Recommend = () => {
//   const [user, setUser] = useState({ username: "" });
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showMessage, setShowMessage] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     // 사용자 정보를 서버에서 가져오는 부분
//     axios
//       .get("/auth/check")
//       .then((response) => {
//         setUser(response.data);
//         // 사용자의 카테고리 정보를 가져와서 선택한 카테고리로 설정
//         const userCategories = response.data.user_prefer;
//         const userImageCategories = response.data.user_imageprefer;
//         if (userCategories) {
//           const categories = userCategories.split(",");
//           setSelectedCategories(categories);
//         }
//         if (userImageCategories) {
//           const imagecategories = userImageCategories.split(",");
//           setSelectedImages(imagecategories);
//         }
//       })
//       .catch((error) => {
//         setUser({ username: "" });
//       });

//     // 카테고리 데이터를 서버에서 가져오는 부분
//     axios
//       .get("/admin/getcategories")
//       .then((response) => {
//         setCategories(response.data.categories);
//       })
//       .catch((error) => {
//         console.error(
//           "카테고리 데이터를 불러오는 중 오류가 발생했습니다:",
//           error
//         );
//       });

//     // 이미지 카테고리 데이터를 서버에서 가져오는 부분
//     axios
//       .get("/admin/getimagecategories")
//       .then((response) => {
//         setImages(response.data.imageCategories);
//       })
//       .catch((error) => {
//         console.error(
//           "이미지 카테고리 데이터를 불러오는 중 오류가 발생했습니다:",
//           error
//         );
//       });
//   }, []);

//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     if (event.target.checked) {
//       setSelectedCategories([...selectedCategories, category]);
//     } else {
//       setSelectedCategories(selectedCategories.filter((c) => c !== category));
//     }
//   };

//   const handleImageChange = (event) => {
//     const imageName = event.target.value; // 이미지의 이름 가져오기
//     if (event.target.checked) {
//       setSelectedImages([...selectedImages, imageName]);
//     } else {
//       setSelectedImages(selectedImages.filter((name) => name !== imageName));
//     }
//   };

//   const handleCategoryRecommend = () => {
//     if (!user || !user.username) {
//       setMessage("먼저 로그인하세요.");
//     } else {
//       // 카테고리 저장 로직 추가
//       axios
//         .post("/saveCategories", { categories: selectedCategories })
//         .then(() => {
//           setMessage("카테고리 등록 완료!!");
//           setShowMessage(true);
//         })
//         .catch((error) => {
//           setMessage("카테고리 저장 오류: " + error.message);
//         });
//     }
//   };

//   const handleImageRecommend = () => {
//     if (!user || !user.username) {
//       setMessage("먼저 로그인하세요.");
//     } else {
//       // 이미지 저장 로직 추가
//       axios
//         .post("/saveImages", { images: selectedImages })
//         .then(() => {
//           setMessage("이미지 등록 완료!!");
//           setShowMessage(true);
//         })
//         .catch((error) => {
//           setMessage("이미지 저장 오류: " + error.message);
//         });
//     }
//   };
//   return (
//     <div>
//       <h1>추천</h1>
//       {user.username ? (
//         <div>
//           <h2>카테고리 선택</h2>
//           {categories.map((category) => (
//             <label key={category}>
//               <input
//                 type="checkbox"
//                 value={category}
//                 onChange={handleCategoryChange}
//                 checked={selectedCategories.includes(category)}
//               />{" "}
//               {category}
//             </label>
//           ))}
//           <button onClick={handleCategoryRecommend}>등록</button>
//           <hr />
//           <div>
//             <h2>이미지 선택</h2>
//             <div style={{ display: "flex", flexWrap: "wrap" }}>
//               {images.map((image) => (
//                 <div
//                   key={image.image_id}
//                   style={{
//                     flexBasis: "33%",
//                     padding: "10px",
//                     boxSizing: "border-box",
//                   }}
//                 >
//                   <img
//                     src={image.image_url}
//                     alt={image.image_genre}
//                     style={{ width: "100%", height: "300px" }}
//                   />
//                   <label>
//                     <input
//                       type="checkbox"
//                       id={image.image_id}
//                       value={image.image_genre}
//                       onChange={handleImageChange}
//                       checked={selectedImages.includes(image.image_genre)}
//                     />{" "}
//                     {image.image_genre}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <button onClick={handleImageRecommend}>이미지 등록</button>
//             {showMessage && (
//               <div className="message">
//                 <p>{message}</p>
//                 <button onClick={() => setShowMessage(false)}>닫기</button>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p>{message}</p>
//           <p>먼저 로그인하세요.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Recommend;

// -------------------------------------------------로그인을 먼저저하세요 띄우게
import React, { useState, useEffect } from "react";
import axios from "axios";

const Recommend = () => {
  const [user, setUser] = useState({ username: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // 사용자 정보를 서버에서 가져오는 부분
    axios
      .get("/auth/check")
      .then((response) => {
        setUser(response.data);
        // 사용자의 카테고리 정보를 가져와서 선택한 카테고리로 설정
        const userCategories = response.data.user_prefer;
        const userImageCategories = response.data.user_imageprefer;
        if (userCategories) {
          const categories = userCategories.split(",");
          setSelectedCategories(categories);
        }
        if (userImageCategories) {
          const imagecategories = userImageCategories.split(",");
          setSelectedImages(imagecategories);
        }
      })
      .catch((error) => {
        setUser({ username: "" });
      });

    // 카테고리 데이터를 서버에서 가져오는 부분
    axios
      .get("/admin/getcategories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error(
          "카테고리 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
      });

    // 이미지 카테고리 데이터를 서버에서 가져오는 부분
    axios
      .get("/admin/getimagecategories")
      .then((response) => {})
      .catch((error) => {
        console.error(
          "이미지 카테고리 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
      });
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleImageChange = (event) => {
    const imageName = event.target.value; // 이미지의 이름 가져오기
    if (event.target.checked) {
      setSelectedImages([...selectedImages, imageName]);
    } else {
      setSelectedImages(selectedImages.filter((name) => name !== imageName));
    }
  };

  const handleCategoryRecommend = () => {
    // 카테고리 저장 로직 추가
    axios
      .post("/saveCategories", { categories: selectedCategories })
      .then(() => {})
      .catch((error) => {});
  };

  const handleImageRecommend = () => {
    if (!user || !user.username) {
    } else {
      // 이미지 저장 로직 추가
      axios
        .post("/saveImages", { images: selectedImages })
        .then(() => {})
        .catch((error) => {});
    }
  };
  return (
    <div>
      {user.username ? (
        <div>
          <h1>추천</h1>
          <h2>카테고리 선택</h2>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(category)}
              />{" "}
              {category}
            </label>
          ))}
          <button onClick={handleCategoryRecommend}>등록</button>
          <hr />
          <div>
            <h2>이미지 선택</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images.map((image) => (
                <div
                  key={image.image_id}
                  style={{
                    flexBasis: "33%",
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={image.image_url}
                    alt={image.image_genre}
                    style={{ width: "100%", height: "300px" }}
                  />
                  <label>
                    <input
                      type="checkbox"
                      id={image.image_id}
                      value={image.image_genre}
                      onChange={handleImageChange}
                      checked={selectedImages.includes(image.image_genre)}
                    />{" "}
                    {image.image_genre}
                  </label>
                </div>
              ))}
            </div>
            <button onClick={handleImageRecommend}>이미지 등록</button>
          </div>
        </div>
      ) : (
        <div>{window.alert("로그인을 먼저하세요.")}</div> //세번뜸!!!!!!
      )}
    </div>
  );
};

export default Recommend;
