class Location
  include Mongoid::Document
  include Mongoid::Timestamps

  field :coordinates, type: Array
  field :name, type: String

  has_many :attractions

  validates_presence_of :name, :coordinates

  def latitude
    self.coordinates[0]
  end

  def longitude
    self.coordinates[1]
  end

  def coordinate_hash
    { latitude: self.coordinates[0], longitude: self.coordinates[1] }
  end
end
