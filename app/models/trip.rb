class Trip
  include Mongoid::Document
  include Mongoid::Timestamps

  field :origin, type: Location
  field :destination, type: Location

  has_many :waypoints, class_name: 'Attraction'

  validates_presence_of :origin, :destination
end
