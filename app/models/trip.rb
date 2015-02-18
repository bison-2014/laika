class Trip
  include Mongoid::Document
  include Mongoid::Timestamps

  field :origin, type: Location
  field :destination, type: Location
  field :pitstop, type: String
  field :map_waypoints, type: Array

  belongs_to :user

  has_many :waypoints, class_name: 'Attraction'

  validates_presence_of :origin, :destination

  def find_waypoint_attraction
    self.map_waypoints.each do |wypt|
     @attraction_lat = wypt[:location][:k]
     @attraction_long = wypt[:location][:D]
    end
    # attract = Attraction.where(longlat: {longitude: -86.80037006735802, latitude: 33.4196718782187})

    attraction_hopefully = Attraction.find_by(longlat: {"type"=>"Point", "coordinates"=>[@attraction_long, @attraction_lat]})
binding.pry
    attraction_hopefully
  end

end


# "k"=>33.4196718782187, "D"=>-86.80037006735802

# Attraction.find_by(longlat: {"type"=>"Point", "coordinates"=>[33.4196718782187, -86.80037006]})
# [-149.87912, 61.188839]


