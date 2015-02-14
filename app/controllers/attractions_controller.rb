class AttractionsController < ApplicationController
  respond_to  :json

  def index
    no = (params[:no] || 5).to_i
    @attractions = Attraction.all.sample no

    respond_with @attractions
  end
end