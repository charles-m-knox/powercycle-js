export interface FitnessData {
  PairedDevices: unknown[];
  DeviceId: number;
  /**
   * @example `Trainer/StationaryBike`
   */
  EquipmentType: string;
  State: string;
  ElapsedTime?: number;
  Distance?: number;
  RealSpeed?: number;
  _EventCount0x1A?: number;
  WheelTicks?: number;
  WheelPeriod?: number;
  Torque?: number;
  _EventCount0x19?: number;
  Cadence?: number;
  InstantaneousPower?: number;
  AccumulatedPower?: number;
  Status?: number;
  /** @example `LowSpeed` */
  TargetStatus?: string;
  CycleLength?: number;
  Resistance?: number;
  HwVersion?: number;
  ManId?: number;
  ModelNum?: number;
}

export interface PowerState {
  previous: number;
  target: number;
}

export interface AntConfig {
  channelId: number;
  deviceId: number;
}
