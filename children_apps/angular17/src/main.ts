import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

let app: any
bootstrapApplication(AppComponent, appConfig).then((res) => {
  app = res
}).catch((err) => console.error(err))


// 卸载angular17子应用
;(window as any).unmount = () => {
  app && app.destroy()
  app = undefined
  console.log('angular17子应用卸载')
}