/// <reference path="./user.d.ts" />
/// <reference path="./diagnosis.d.ts" />

import type { MpColor as MpColorType } from "../module/styled-component/color-palette";
import {
  Percent as PercentType,
  PixelNumber as PixelNumberType,
  PixelNumbers as PixelNumbersType,
  Variant as VariantType
} from "../module/styled-component/util/style-types";

declare global {
  type User = UserPublic;
  type MpColor = MpColorType;
  type Percent = PercentType;
  type PixelNumber = PixelNumberType;
  type PixelNumbers = PixelNumbersType;
  type Variant = VariantType;
}
