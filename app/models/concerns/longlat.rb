module LongLat
  extend ActiveSupport::Concern

  def latitude
    self.longlat['coordinates'][1]
  end

  def longitude
    self.longlat['coordinates'][0]
  end

end
