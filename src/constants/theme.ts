export interface Theme {
  Background: string;
  color: string;
  titleColor: string;
  activeBG: string;
  activeColor: string;
  searchBG: string;
  sendPanelBG: string;
  chatInput: string;
  chatPlaceHolder: string;
}

const blackTheme: Theme = {
  Background: '#0f1012',
  color: 'rgba(255,255,255,0.5)',
  titleColor: '#FFF',
  activeBG: '#4e83a699',
  activeColor: '#FFF!important',
  searchBG: 'rgba(255, 255, 255, 0.3)',
  sendPanelBG: '#0f1012',
  chatInput: '#FFF',
  chatPlaceHolder: '#c7c7c7',
};

const whiteTheme: Theme = {
  Background: '#FFF',
  color: 'rgb(98 96 96)',
  titleColor: '#000',
  activeBG: 'rgb(109 148 230)',
  activeColor: '#FFF!important',
  searchBG: 'rgb(119 113 113 / 30%)',
  sendPanelBG: '#FFF',
  chatInput: 'black',
  chatPlaceHolder: 'gray',
};

export { blackTheme, whiteTheme };
