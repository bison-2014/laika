class AttractionsController < ApplicationController
  respond_to  :json

  def index
    @attractions = Attraction.all.sample(5)
    respond_with @attractions
  end

end
