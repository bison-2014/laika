module ApplicationHelper

  def success?
    !!flash[:success]
  end

  def errors
    flash.now[:errors] || []
  end

end
