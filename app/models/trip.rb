class Trip
  include Mongoid::Document
  include Mongoid::Timestamps

  field :origin, type: Location
  field :destination, type: Location
  field :pitstop, type: String
  field :map_waypoints, type: Array
  field :yelp_waypoints, type: Array

  belongs_to :user

  has_many :waypoints, class_name: 'Attraction'

  validates_presence_of :origin, :destination

end


