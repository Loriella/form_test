import React from "react";

function dragOver(event) {
  event.preventDefault();
}

const DropModal = ({onDragLeave, onDrop}) => {
  return (
    <div
      className="drop-modal-wrap drop d-flex align-items-center"
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={dragOver}
    >
      <div className="drop-modal">
        <h3>Бросайте файлы сюда, я ловлю</h3>
        <p>Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. Размеры файла до 5 МБ</p>
      </div>
    </div>
  )
};

export default DropModal;
