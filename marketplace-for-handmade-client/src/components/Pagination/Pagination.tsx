import style from "./style.module.scss";
import React, { Component } from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "../Button/Button";

interface Props {
  currentPage: number;
  numberOfPages: number;
  previousPage;
  nextPage;
  setPage;
}

@observer
class Pagination extends Component<Props> {
  @observable array: number[] = [];

  componentDidMount(): void {
      this.createArray();
  }

    componentDidUpdate(prevProps: Readonly<Props>): void {
    if (this.props.numberOfPages !== prevProps.numberOfPages) {
      this.createArray();
    }
  }

  @action.bound
  createArray() {
    this.array = Array.from(Array(this.props.numberOfPages).keys());
  }

  render() {
    const {
      numberOfPages,
      currentPage,
      previousPage,
      nextPage,
      setPage,
    } = this.props;

      return (
      <div className={style.pagination}>
        <Button
          styleType="small"
          id="buttonPagePrevious"
          className={classNames(style.buttonPage)}
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </Button>

        <div className={style.pagination__buttonsPage}>
          {this.array.map((num) => (
            <div key={num}>
              <Button
                styleType="small"
                id={"buttonPage" + num}
                className={classNames(style.buttonPage, {
                  [style.currentButtonPage]: currentPage === num + 1,
                })}
                onClick={() => setPage(num + 1)}
                disabled={currentPage === num + 1}
              >
                {num + 1}
              </Button>
            </div>
          ))}
        </div>

        <Button
          styleType="small"
          id="buttonPageNext"
          className={classNames(style.buttonPage, "buttonPageNext")}
          onClick={nextPage}
          disabled={currentPage === numberOfPages}
        >
          <FaArrowRight />
        </Button>
      </div>
    );
  }
}

export default Pagination;
