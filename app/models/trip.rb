class Trip
  include Mongoid::Document
  include Mongoid::Timestamps

  field :origin, type: Location
  field :destination, type: Location
  field :pitstop, type: String
  field :map_waypoints, type: Array

  belongs_to :user

  has_and_belongs_to_many :yelp_waypoints, class_name: 'Attraction'

  validates_presence_of :origin, :destination

end


