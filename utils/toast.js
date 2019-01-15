import { Toast } from 'antd-mobile';
import React from 'react';

export default class CustomToast {
  static info = (content, duration, onClose, mask) => {
    Toast.info(content, duration, onClose, mask);
    const toastElement = document.getElementsByClassName('am-toast-mask')[0];
    toastElement &&
      toastElement.addEventListener('click', () => {
        Toast.hide();
        onClose && onClose();
      });
  };
  static success = (content, duration, onClose, mask) => {
    Toast.success(content, duration, onClose, mask);
  };
  static fail = (content, duration, onClose, mask) => {
    Toast.fail(content, duration, onClose, mask);
  };
  static offline = (content, duration, onClose, mask) => {
    Toast.offline(content, duration, onClose, mask);
  };
  static hide = () => {
    Toast.hide();
  };
  static coin = (coinText = '积分', coninNum = 0, onClose, duration = 3) => {
    CustomToast.info(
      <div>
        <span>{coinText}</span>
        {coninNum > 0 && (
          <React.Fragment>
            <img
              className="rotateY"
              style={{
                width: '0.14rem',
                margin: '0 0.03rem 0 0.1rem',
                display: 'inline-block',
                verticalAlign: '-0.12em'
              }}
              src="https://cdn-global1.unicareer.com/uniAcademy/static/images/course/coin.svg"
            />
            <span>+{coninNum}</span>
          </React.Fragment>
        )}
      </div>,
      duration,
      onClose
    );
  };
  static loading = (content, duration, onClose, mask) => {
    Toast.info(
      <div>
        <svg className="rotate360-800" width="0.26rem" height="0.26rem" viewBox="0 0 26 26">
          <title>加载</title>
          <desc>Created with Sketch.</desc>
          <g id="首页" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-185.000000, -519.000000)" fill="#FFFFFF" id="加载">
              <g transform="translate(185.000000, 519.000000)">
                <g id="分组" transform="translate(0.625011, 0.625011)">
                  <path
                    d="M12.3750144,0.0259531552 C5.53983848,0.0259531552 0,5.56600648 0,12.4009676 C0,19.2359286 5.53983848,24.775982 12.3750144,24.775982 C19.2099755,24.775982 24.7500288,19.2359286 24.7500288,12.4009676 C24.7500288,5.56579163 19.2099755,0.0259531552 12.3750144,0.0259531552 Z M12.3750144,22.028385 C7.05736759,22.028385 2.74781179,17.7185714 2.74781179,12.4009676 C2.74781179,7.08332074 7.05741056,2.7735501 12.3750144,2.7735501 C17.6926612,2.7735501 22.0026467,7.08336371 22.0026467,12.4009676 C22.0026467,17.7186144 17.6926182,22.028385 12.3750144,22.028385 Z"
                    id="形状"
                    fillOpacity="0.2"
                    fillRule="nonzero"
                  />
                  <path
                    d="M12.3749972,0.0259402646 L12.3750144,2.77353721 C17.6926612,2.77353721 22.0026467,7.08335082 22.0026467,12.4009547 L24.7500116,12.4009547 C24.7500116,5.56577874 19.2099583,0.0259402646 12.3749972,0.0259402646 Z"
                    id="路径"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div style={{ fontSize: '0.12rem' }}>{content}</div>
      </div>,
      duration,
      onClose,
      mask
    );
  };
}
