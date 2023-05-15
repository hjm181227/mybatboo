/// <reference path="./user.d.ts" />
/// <reference path="./category.d.ts" />
/// <reference path="./diagnosis.d.ts" />
/// <reference path="./api-response.d.ts" />

import {
  MpColor as MpColorType,
  Percent as PercentType,
  PixelNumber as PixelNumberType,
  PixelNumbers as PixelNumbersType,
  Variant as VariantType,
  MpOption as MpOptionType
} from "@mapiacompany/styled-components"

declare global {
  type User = UserPublic;

  type MpOption = MpOptionType;
  type MpColor = MpColorType;
  type Percent = PercentType;
  type PixelNumber = PixelNumberType;
  type PixelNumbers = PixelNumbersType;
  type Variant = VariantType;
}
