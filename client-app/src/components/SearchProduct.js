import React from 'react'
import { BsSearch } from "react-icons/bs";

export const SearchProduct = () => {
  return (
    <div className="input-group mb-3">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Nhập mã sản phẩm ở đây"
              aria-label="Nhập mã sản phẩm ở đây"
              aria-describedby="basic-addon2">
            </input>
            <span className="input-group-text" id="basic-addon2">
              <BsSearch/>
            </span>
            
          </div>
  )
}
