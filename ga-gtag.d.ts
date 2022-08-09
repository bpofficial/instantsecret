declare module "ga-gtag" {
    export default function (
        command: "event",
        eventName: Gtag.EventNames | string,
        eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams
    ): void;
}
