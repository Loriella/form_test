import React from "react";

const SendMessages = () => {
  return (
    <div className="pt-4">
      <h2>Отправленные сообщения</h2>
      <table className="table table-sm table-borderless">
        <thead>
        <tr>
          <th className="cell-w" scope="col">Дата</th>
          <th scope="col" colSpan="2" className="text-over">Тема</th>
          <th className="cell-w text-right" scope="col">Статус</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="cell-w">30 сентября</td>
          <td colSpan="2" className="text-over">Тема письма котоооооооооо hhjh оооооо ооооо оооооооооов не влезает
            слово b tot jlkj
          </td>
          <td className="text-right">Отправлено</td>
        </tr>
        <tr>
          <td className="cell-w">30 сентября</td>
          <td colSpan="2" className="text-over">Тема письма оов</td>
          <td className="cell-w text-right">Отправлено</td>
        </tr>
        </tbody>
      </table>
      {/*<div>Сообщения еще не отправлялись</div>*/}
    </div>
  )
};

export default SendMessages;
