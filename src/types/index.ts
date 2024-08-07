export default interface IData {
  CurrentStatus?: {
    state: string;
    timestamp: string;
  };
  TrackingNumber?: string;
  PromisedDate?: string;
  TransitEvents?: [
    {
      state: string;
      timestamp: string;
      hub: string;
      reason: string;
    }
  ];
  error?: string;
  newData?: {};
}
