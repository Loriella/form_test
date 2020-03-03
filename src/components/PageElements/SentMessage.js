import React from "react";

const SentMessage = () => {
  return (
    <div className="sent-m mt-4">
      <div className="sent-m-wrap">
        <h3>Сообщение поставлено в очередь на отправку</h3>
        <p>Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты
          получателя &#171;abc@my.com&#187; со скоростью электронов</p>
      </div>
    </div>
  )
};

export default SentMessage;
