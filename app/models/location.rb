class Location
  include Mongoid::Document
  include Mongoid::Timestamps

  field :longlat, type: Hash
  field :city, type: String
  field :region, type: String

  has_many :attractions

  validates_presence_of :city, :region, :longlat

  def latitude
    self.longlat['coordinates'][1]
  end

  def longitude
    self.longlat['coordinates'][0]
  end

end
