import React from "react";
import { Pagination } from "react-bootstrap";

//CSS
import "./CustomPagination.scss";

const CustomPagination = ({ count, handlePaginationClick, page }) => {
    let items = [];
    for (let number = 1; number <= count; number++) {
        items.push(
            <Pagination.Item
                onClick={() => {
                    handlePaginationClick(number);
                }}
                key={number}
                active={number === page}
                activeLabel=""
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="pagination-container">
            <Pagination>
                <Pagination.First onClick={() => handlePaginationClick(1)} />

                {items.length <= 3 ? null : page < 3 ? null : (
                    <Pagination.Ellipsis disabled />
                )}

                {items.length > 3
                    ? page < 3
                        ? items.slice(0, 3)
                        : items.length < page + 1
                            ? items.slice(items.length - 3)
                            : items.slice(page - 2, page + 1)
                    : items}

                {items.length <= 3 ? null : items.length < page + 2 ? null : (
                    <Pagination.Ellipsis disabled />
                )}

                <Pagination.Last onClick={() => handlePaginationClick(items.length)} />
            </Pagination>
        </div>
    );
};

export default CustomPagination;
