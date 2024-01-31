import React from "react";
import { Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Paginate({ page, pages, keyWord = "", isAdmin = false }) {
    let keyWordData = keyWord;
    if (keyWord) {
        keyWordData = keyWord.split("?")[1].split("&")[0].split("=")[1];
    }
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Pagination.Item
                        active={x + 1 == page}
                        href={
                            isAdmin
                                ? `/admin/products/?keyWord=${keyWordData}&page=${
                                      x + 1
                                  }`
                                : `/?keyWord=${keyWordData}&page=${x + 1}`
                        }
                        key={x + 1}
                    >
                        {x + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    );
}

export default Paginate;
