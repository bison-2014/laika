class Location
  include Mongoid::Document
  include Mongoid::Timestamps

  field :coordinates, type: Array
  field :name, type: String

  has_many :attractions

  def latitude
    self.coordinate[0]
  end

  def longitude
    self.coordinate[1]
  end
end
