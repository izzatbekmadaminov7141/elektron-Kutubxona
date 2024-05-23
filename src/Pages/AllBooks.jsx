import { useState } from "react";
import { useFetch } from "../useFetch";

const FaqAccordion = () => {
  const { data, isLoading, error } = useFetch(
    "https://usatlibrary.pythonanywhere.com/api/v1/book-list/"
  );

  const [currentBookUrl, setCurrentBookUrl] = useState("");
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleBookClick = (bookLink) => {
    setCurrentBookUrl(bookLink);
    const formattedLink =
      bookLink.startsWith("http://") || bookLink.startsWith("https://")
        ? bookLink
        : `https://usatlibrary.pythonanywhere.com/${bookLink}`;
    setCurrentBookUrl(formattedLink);
    // eslint-disable-next-line no-undef
    new bootstrap.Modal(document.getElementById("bookModal")).show();
  };

  return (
    <div className="container my-5" id="book">
      <h2>Fan va texnologiyalar universiteti elektron kutubxonasi</h2>

      {data?.map((item, index) => (
        <div
          className="accordion my-5"
          id={`faqAccordion${index + 1}`}
          key={index}
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id={`heading${index + 1}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index + 1}`}
                aria-expanded="false"
                aria-controls={`collapse${index + 1}`}
              >
                {item.name}
              </button>
            </h2>
            <div
              id={`collapse${index + 1}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index + 1}`}
              data-bs-parent={`#faqAccordion${index + 1}`}
            >
              <div className="accordion-body">
                <strong>{item.answer}</strong>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Kitob nomi</th>
                      <th scope="col">Muallif</th>
                      <th scope="col">Nashr yili</th>
                      <th scope="col">{`Kitobni o'qish`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.books?.map((detail, detailIndex) => (
                      <tr key={detailIndex}>
                        <td>{detailIndex + 1}</td>
                        <td>{detail.title}</td>
                        <td>{detail.author}</td>
                        <td>{detail.sub_title}</td>
                        <td>
                          <button
                            onClick={() => handleBookClick(detail.book_link)}
                            className="btn btn-link"
                          >
                            {"Havola"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal oynasi */}
      <div
        className="modal fade"
        id="bookModal"
        tabIndex="-1"
        aria-labelledby="bookModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bookModalLabel">
                {`Kitob Ko'rinishi`}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {currentBookUrl && (
                <iframe
                  src={currentBookUrl}
                  width="100%"
                  height="800px"
                  title="Book Viewer"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
