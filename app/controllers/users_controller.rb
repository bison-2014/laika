class UsersController < ApplicationController

  def new
    render 'new'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id.to_s
      redirect_to root_path
    else
      flash.now[:errors] = @user.errors
      render 'new'
    end
  end

  def profile
    arr = []
    @all_categories = Category.each  { |cat| arr << cat }
    @main_interests = arr.uniq { |cat| cat.name }
    @user_interests = current_user.interests.distinct(:subcategory_name)

    render 'edit'
  end

  def update
    @user_interests = current_user.interests.distinct(:subcategory_name)
    current_user.interests = Category.in(subcategory_name: user_params[:interests]).all.to_a

    if current_user.valid?
      current_user.save!
      flash[:success] = true
      redirect_to users_profile_path
    else
      flash.now[:errors] = current_user.errors
      render 'edit'
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :'interests' => [])
  end

end
