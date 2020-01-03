// import React, { useEffect, useRef } from "react";
// import "./Pagination.scss";

// function Pagination(props) {
//   const { pageCount, currentPage, changePage } = props;

//   const useDidUpdate = (callback, deps) => {
//     const hasMount = useRef(false);
//     useEffect(() => {
//       if (hasMount.current) {
//         callback();
//       } else {
//         hasMount.current = true;
//       }
//     }, [callback]);
//   };

//   useDidUpdate(() => {
//     renderNumber();
//   }, [pageCount]);

//   const renderNumber = pageCount => {
//     const numbers = Array.from(Array(pageCount), () => {
//       return pageCount--;
//     }).reverse();

//     return numbers.map(num => {
//       if (num === currentPage) {
//         return (
//           <span className="bold" onClick={goToPageNumber}>
//             {num}
//           </span>
//         );
//       } else {
//         return <span onClick={goToPageNumber}>{num}</span>;
//       }
//     });
//   };

//   const goToPageNumber = e => {
//     const pageNumber = e.target.textContent;

//     changePage(pageNumber);
//   };

//   const handlePage = e => {
//     if (e.target.textContent === "<<") {
//       const prev = currentPage - 1;
//       pageCount > prev && changePage(prev);
//     } else if (e.target.textContent === ">>") {
//       const next = currentPage + 1;
//       pageCount > next && changePage(next);
//     }
//   };
//   return (
//     <div className="pagination">
//       <span onClick={handlePage}>{"<<"}</span>
//       {renderNumber(pageCount)}
//       <span onClick={handlePage}>{">>"}</span>
//     </div>
//   );
// }
// export default Pagination;

import React, { Component } from "react";
import "./Pagination.scss";

export class Pagination extends Component {
  renderNumber = pageCount => {
    const numbers = Array.from(Array(pageCount), () => {
      return pageCount--;
    }).reverse();

    return numbers.map(num => {
      if (num === this.props.currentPage) {
        return (
          <span className="bold" onClick={this.goToPageNumber}>
            {num}
          </span>
        );
      } else {
        return <span onClick={this.goToPageNumber}>{num}</span>;
      }
    });
  };

  componentDidUpdate() {
    this.renderNumber(this.props.pageCount);
  }

  goToPageNumber = e => {
    const pageNumber = parseInt(e.target.textContent);

    this.props.changePage(pageNumber);
  };

  handlePage = e => {
    if (e.target.textContent === "<<") {
      const prev = this.props.currentPage - 1;
      this.props.pageCount > prev && this.props.changePage(prev);
    } else if (e.target.textContent === ">>") {
      const next = this.props.currentPage + 1;
      this.props.pageCount >= next && this.props.changePage(next);
    }
  };
  render() {
    return (
      <div className="pagination">
        <span onClick={this.handlePage}>{"<<"}</span>
        {this.renderNumber(this.props.pageCount)}
        <span onClick={this.handlePage}>{">>"}</span>
      </div>
    );
  }
}

export default Pagination;
