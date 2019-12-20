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
    const pageNumber = e.target.textContent;

    this.props.changePage(pageNumber);
  };

  handlePage = e => {
    if (e.target.textContent === "<<") {
      const prev = this.props.currentPage - 1;
      this.props.pageCount > prev && this.props.changePage(prev);
    } else if (e.target.textContent === ">>") {
      const next = this.props.currentPage + 1;
      this.props.pageCount > next && this.props.changePage(next);
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
