class TripsController < ApplicationController
  respond_to :json

  def create
    @trip = Trip.create!(trip_params) { |t| t.user = current_user }

    render json: { status: true }
  end

  private

  def trip_params
    params.require(:trip).permit(:origin, :destination, :pitstop, {:map_waypoints => [{:location => [:k, :D]}, :stopover]}, :yelp_waypoints)
  end

end

