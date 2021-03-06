// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  mapbox: {
    accessToken: 'pk.eyJ1IjoibGVnZW5kYWlncmUiLCJhIjoiY2trNDdsZ256MWlkbjJvbWYyeWt5bHRiZSJ9.9D-pfU7m_1A0WYBm5IOP9A'
  },
  style: 'mapbox://styles/legendaigre/ckokag0zs1o4417o2sx7ogkpy',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
