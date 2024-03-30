

export class RegionServices {
  constructor() {}

  async getSomeDataRegions() {
    try {
      return []
    } catch (er: any) {
      throw new Error(er.message);
    }
  }
}
