class Location
  include Mongoid::Document
  include Mongoid::Timestamps

  field :latitude, type: Float
  field :longitude, type: Float
  field :name, type: String

  has_many :attractions
end
