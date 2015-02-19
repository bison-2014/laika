class TripsController < ApplicationController
  respond_to :json

  def create
    @trip = Trip.create!(trip_params) do |t|
      t.user = current_user
      params[:yelp_waypoints].each do |yelp|
        t.yelp_waypoints << Attraction.find(yelp['_id'])
      end
    end
    render json: { status: true }
  end

  private

  def trip_params

    params[:trip].permit(:origin, :destination, :pitstop, {:map_waypoints => [{:location => [:k, :D]}, :stopover]})
  end
end
